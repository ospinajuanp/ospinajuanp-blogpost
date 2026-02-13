'use server'

export async function verifyPostPassword(password: string): Promise<boolean> {
    const secret = process.env.BLOG_POST_SECRET;

    // Artificial delay to prevent timing attacks (optional but good practice)
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!secret) {
        console.error('BLOG_POST_SECRET is not set in environment variables');
        return false;
    }

    return password === secret;
}
