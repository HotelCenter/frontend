import { globSync } from "glob";
import { NextResponse } from "next/server";
import readdir from "readdirp";
import path from "path";
export function POST() {
    const files = globSync('src/nextmiddleware/*.{ts,js}')
    return NextResponse.json({ files })
}