import { NextRequest, NextResponse } from "next/server";

function getMiddlewarePaths(matcher: MiddleRoutes) {
    const path_patterns: string[] = [];
    let stack = [...Object.entries(matcher)];
    while (stack.length > 0) {
        const [key, value] = stack.pop() as [string, MiddleRoutes]
        if (Array.isArray(value)) {
            for (const p of value) {
                path_patterns.push(`\/${key}\/${p}`);
            }


        } else if (typeof value === 'object') {
            if (value === null) {
                path_patterns.push(`\/${key}`);
            } else {
                let paths = Object.entries(value).map(([k, v]): [string, MiddleRoutes] => [`${key}\/${k}`, v as MiddleRoutes]);
                stack = [...stack, ...paths];
            }

        }
    }
    return path_patterns;
}

export default async function bindM(request: NextRequest) {
    const files_res = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/middleware`, { method: "POST" })
    let response = NextResponse.next()

    const { files }: { files: string[] } = await files_res.json()
    for (const fileDir of files.sort()) {

        try {
            const filename = fileDir.match(/.*\/(.*)\.ts$/)
            if (filename) {
                const module = await import(`../nextmiddleware/${filename[1]}`) as { default: Function, routes: MiddleRoutes }
                const { default: middleware, routes } = module
                const paths = getMiddlewarePaths(routes);
                const regex = new RegExp(`^${paths.join('|')}$`, 'i');
                if (regex.test(request.nextUrl.pathname)) {
                    response = await middleware(request, response);
                }

            }

        } catch (err: any) {
            throw Error(err)
        }

    }

    return response



}