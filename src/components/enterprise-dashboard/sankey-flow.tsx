"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DASHBOARD_COLORS } from "./dashboard-context";
import { AnimatedNumber } from "../ui/animated-number";

gsap.registerPlugin(ScrollTrigger);

interface SankeyNode {
    id: string;
    name: string;
    group: "source" | "channel" | "product";
}

interface SankeyLink {
    source: string;
    target: string;
    value: number;
}

interface SankeyFlowProps {
    title?: string;
    nodes?: SankeyNode[];
    links?: SankeyLink[];
}

const defaultNodes: SankeyNode[] = [
    // Sources
    { id: "direct", name: "Direct Sales", group: "source" },
    { id: "partners", name: "Channel Partners", group: "source" },
    { id: "digital", name: "Digital", group: "source" },
    { id: "referral", name: "Referrals", group: "source" },
    // Channels
    { id: "enterprise", name: "Enterprise", group: "channel" },
    { id: "smb", name: "SMB", group: "channel" },
    { id: "consumer", name: "Consumer", group: "channel" },
    // Products
    { id: "hardware", name: "Hardware", group: "product" },
    { id: "software", name: "Software", group: "product" },
    { id: "services", name: "Services", group: "product" },
];

const defaultLinks: SankeyLink[] = [
    // Direct Sales flows
    { source: "direct", target: "enterprise", value: 180 },
    { source: "direct", target: "smb", value: 65 },
    // Channel Partners flows
    { source: "partners", target: "enterprise", value: 120 },
    { source: "partners", target: "smb", value: 145 },
    { source: "partners", target: "consumer", value: 40 },
    // Digital flows
    { source: "digital", target: "smb", value: 95 },
    { source: "digital", target: "consumer", value: 180 },
    // Referral flows
    { source: "referral", target: "enterprise", value: 35 },
    { source: "referral", target: "smb", value: 60 },
    // Channel to Product flows
    { source: "enterprise", target: "hardware", value: 145 },
    { source: "enterprise", target: "software", value: 130 },
    { source: "enterprise", target: "services", value: 60 },
    { source: "smb", target: "hardware", value: 120 },
    { source: "smb", target: "software", value: 165 },
    { source: "smb", target: "services", value: 80 },
    { source: "consumer", target: "hardware", value: 140 },
    { source: "consumer", target: "software", value: 65 },
    { source: "consumer", target: "services", value: 15 },
];

const groupColors: Record<string, string> = {
    source: DASHBOARD_COLORS.primary,
    channel: DASHBOARD_COLORS.secondary,
    product: DASHBOARD_COLORS.tertiary,
};

export const SankeyFlow: React.FC<SankeyFlowProps> = ({
    title = "Revenue Flow: Acquisition Channel → Segment → Product (₹ Cr)",
    nodes = defaultNodes,
    links = defaultLinks,
}) => {
    const [hoveredLink, setHoveredLink] = useState<SankeyLink | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const linksRef = useRef<(SVGPathElement | null)[]>([]);
    const nodesRef = useRef<(SVGRectElement | null)[]>([]);
    const textRef = useRef<(SVGTextElement | null)[]>([]);

    const chartWidth = 900;
    const chartHeight = 300;
    const nodeWidth = 18;
    const nodePadding = 12;

    // Group nodes by their group
    const sourceNodes = nodes.filter((n) => n.group === "source");
    const channelNodes = nodes.filter((n) => n.group === "channel");
    const productNodes = nodes.filter((n) => n.group === "product");

    // Calculate node positions
    const columnX = {
        source: 60,
        channel: chartWidth / 2 - nodeWidth / 2,
        product: chartWidth - 80,
    };

    // Calculate node values (sum of incoming/outgoing links)
    const getNodeValue = (nodeId: string) => {
        const incoming = links.filter((l) => l.target === nodeId).reduce((sum, l) => sum + l.value, 0);
        const outgoing = links.filter((l) => l.source === nodeId).reduce((sum, l) => sum + l.value, 0);
        return Math.max(incoming, outgoing);
    };

    // Calculate node heights and positions
    const calculateNodePositions = (nodeList: SankeyNode[], columnKey: string) => {
        const totalValue = nodeList.reduce((sum, n) => sum + getNodeValue(n.id), 0);
        const availableHeight = chartHeight - (nodeList.length - 1) * nodePadding - 40;

        let currentY = 20;
        return nodeList.map((node) => {
            const value = getNodeValue(node.id);
            const height = Math.max((value / totalValue) * availableHeight, 20);
            const pos = {
                id: node.id,
                name: node.name,
                x: columnX[node.group as keyof typeof columnX],
                y: currentY,
                height,
                value,
                group: node.group,
            };
            currentY += height + nodePadding;
            return pos;
        });
    };

    const sourcePositions = calculateNodePositions(sourceNodes, "source");
    const channelPositions = calculateNodePositions(channelNodes, "channel");
    const productPositions = calculateNodePositions(productNodes, "product");

    const allPositions = [...sourcePositions, ...channelPositions, ...productPositions];

    const getNodePos = (id: string) => allPositions.find((p) => p.id === id);

    // Track cumulative offsets for link positioning
    const nodeOutOffsets: Record<string, number> = {};
    const nodeInOffsets: Record<string, number> = {};

    // Generate link paths
    const generateLinkPath = (link: SankeyLink) => {
        const sourceNode = getNodePos(link.source);
        const targetNode = getNodePos(link.target);
        if (!sourceNode || !targetNode) return { path: "", thickness: 0 };

        const sourceTotal = links
            .filter((l) => l.source === link.source)
            .reduce((sum, l) => sum + l.value, 0);

        const thickness = Math.max((link.value / sourceTotal) * sourceNode.height * 0.8, 4);

        // Calculate offsets
        if (!nodeOutOffsets[link.source]) nodeOutOffsets[link.source] = 0;
        if (!nodeInOffsets[link.target]) nodeInOffsets[link.target] = 0;

        const sourceY = sourceNode.y + nodeOutOffsets[link.source] + thickness / 2;
        const targetY = targetNode.y + nodeInOffsets[link.target] + thickness / 2;

        nodeOutOffsets[link.source] += thickness + 2;
        nodeInOffsets[link.target] += thickness + 2;

        const x1 = sourceNode.x + nodeWidth;
        const x2 = targetNode.x;
        const midX = (x1 + x2) / 2;

        const path = `M ${x1} ${sourceY} C ${midX} ${sourceY}, ${midX} ${targetY}, ${x2} ${targetY}`;

        return { path, thickness, sourceY, targetY };
    };

    const processedLinks = links.map((link) => ({
        ...link,
        ...generateLinkPath(link),
    }));

    useGSAP(() => {
        if (!containerRef.current) return;

        // Container entry
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            {
                opacity: 1,
                duration: 0.8,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 95%",
                }
            }
        );

        // Links animation
        linksRef.current.forEach((path, idx) => {
            if (path) {
                const length = path.getTotalLength();
                gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
                gsap.to(path, {
                    attr: { strokeDashoffset: 0 },
                    duration: 1.5,
                    delay: 0.2 + idx * 0.05,
                    ease: "power1.inOut",
                    scrollTrigger: { trigger: containerRef.current, start: "top 95%" }
                });
            }
        });

        // Nodes animation
        nodesRef.current.forEach((rect, idx) => {
            if (rect) {
                gsap.fromTo(rect,
                    { scaleY: 0, opacity: 0 },
                    {
                        scaleY: 1,
                        opacity: 1,
                        duration: 0.8,
                        delay: 0.1,
                        ease: "power2.out",
                        scrollTrigger: { trigger: containerRef.current, start: "top 95%" }
                    }
                );
            }
        });

        // Text animation
        textRef.current.forEach((text, idx) => {
            if (text) {
                gsap.fromTo(text,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        delay: 0.6,
                        scrollTrigger: { trigger: containerRef.current, start: "top 95%" }
                    }
                );
            }
        });
    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="rounded-lg border p-5 h-full"
            style={{
                opacity: 1,
                backgroundColor: DASHBOARD_COLORS.card,
                borderColor: DASHBOARD_COLORS.border
            }}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold" style={{ color: DASHBOARD_COLORS.textPrimary }}>{title}</h3>
                <div className="flex items-center gap-4 text-xs">
                    {Object.entries(groupColors).map(([group, color]) => (
                        <div key={group} className="flex items-center gap-1.5">
                            <div
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: color }}
                            />
                            <span className="capitalize" style={{ color: DASHBOARD_COLORS.textSecondary }}>{group}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chart */}
            <svg
                width="100%"
                height={chartHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="overflow-visible"
            >
                {/* Links */}
                {processedLinks.map((link, i) => {
                    const isHovered = hoveredLink?.source === link.source && hoveredLink?.target === link.target;
                    return (
                        <path
                            key={i}
                            ref={el => { linksRef.current[i] = el; }}
                            d={link.path}
                            fill="none"
                            stroke={isHovered ? DASHBOARD_COLORS.primary : DASHBOARD_COLORS.gridLine}
                            strokeWidth={link.thickness}
                            style={{ opacity: isHovered ? 0.9 : hoveredLink ? 0.2 : 0.4 }}
                            onMouseEnter={() => setHoveredLink(link)}
                            onMouseLeave={() => setHoveredLink(null)}
                            className="transition-colors duration-200 cursor-pointer"
                        />
                    );
                })}

                {/* Nodes */}
                {allPositions.map((node, i) => (
                    <g key={node.id}>
                        <rect
                            ref={el => { nodesRef.current[i] = el; }}
                            x={node.x}
                            y={node.y}
                            width={nodeWidth}
                            height={node.height}
                            fill={groupColors[node.group]}
                            rx="3"
                        />
                        <text
                            ref={el => { textRef.current[i * 2] = el; }}
                            x={
                                node.group === "source"
                                    ? node.x - 5
                                    : node.group === "product"
                                        ? node.x + nodeWidth + 5
                                        : node.x + nodeWidth / 2
                            }
                            y={node.y + node.height / 2 + 4}
                            textAnchor={
                                node.group === "source"
                                    ? "end"
                                    : node.group === "product"
                                        ? "start"
                                        : "middle"
                            }
                            className="text-[10px] font-medium"
                            style={{ fill: DASHBOARD_COLORS.textPrimary }}
                        >
                            {node.name}
                        </text>
                        <text
                            ref={el => { textRef.current[i * 2 + 1] = el; }}
                            x={
                                node.group === "source"
                                    ? node.x - 5
                                    : node.group === "product"
                                        ? node.x + nodeWidth + 5
                                        : node.x + nodeWidth / 2
                            }
                            y={node.y + node.height / 2 + 16}
                            textAnchor={
                                node.group === "source"
                                    ? "end"
                                    : node.group === "product"
                                        ? "start"
                                        : "middle"
                            }
                            className="text-[9px]"
                            style={{ fill: DASHBOARD_COLORS.textSecondary }}
                        >
                            ₹<AnimatedNumber value={node.value} /> Cr
                        </text>
                    </g>
                ))}

                {/* Hover tooltip */}
                {hoveredLink && (
                    <g>
                        <rect
                            x={chartWidth / 2 - 80}
                            y={5}
                            width={160}
                            height={38}
                            fill={DASHBOARD_COLORS.background}
                            stroke={DASHBOARD_COLORS.border}
                            rx="4"
                            opacity="0.95"
                        />
                        <text
                            x={chartWidth / 2}
                            y={22}
                            textAnchor="middle"
                            className="text-[10px] font-medium"
                            style={{ fill: DASHBOARD_COLORS.textPrimary }}
                        >
                            {nodes.find((n) => n.id === hoveredLink.source)?.name} →{" "}
                            {nodes.find((n) => n.id === hoveredLink.target)?.name}
                        </text>
                        <text
                            x={chartWidth / 2}
                            y={36}
                            textAnchor="middle"
                            className="text-[11px] font-bold"
                            style={{ fill: DASHBOARD_COLORS.accent }}
                        >
                            ₹{hoveredLink.value} Cr
                        </text>
                    </g>
                )}
            </svg>
        </div>
    );
};
