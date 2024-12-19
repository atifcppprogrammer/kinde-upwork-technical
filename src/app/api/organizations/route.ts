//@ts-ignore
import { Organizations, init } from "@kinde/management-api-js";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { isAuthenticated } = getKindeServerSession();
    if (!(await isAuthenticated())) {
      return new Response("Unauthorized", { status: 401 });
    }

    init();
    const { organizations } = await Organizations.getOrganizations();
    return NextResponse.json({ organizations });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Oops ! Something went wrong' });
  }
}

