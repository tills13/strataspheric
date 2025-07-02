import { NextRequest } from "next/server";

import { signInUser } from "../data/users/signInUser";
import * as formdata from "../utils/formdata";
import { formatJwtCookie } from "./cookies";
import { VALIDITY_PERIOD, buildJwt, getKey, readJwtFromRequest } from "./jwt";
import { Config } from "./types";

const BASE_ENDPOINT = "/api/session";
const SIGN_IN_ENDPOINT = `${BASE_ENDPOINT}/create`;
const SIGN_OUT_ENDPOINT = `${BASE_ENDPOINT}/destroy`;
const REFRESH_ENDPOINT = `${BASE_ENDPOINT}/refresh`;

export async function GET(config: Config, req: NextRequest) {
  const reqUrl = new URL(req.url);
  const cookieConfig =
    typeof config.cookies === "function" ? config.cookies(req) : config.cookies;

  if (reqUrl.pathname !== REFRESH_ENDPOINT) {
    return new Response("Not Found", { status: 4040 });
  }

  try {
    const { payload } = await readJwtFromRequest(config, req);
    const newPayload = {
      ...payload,
      exp: new Date().getTime() + VALIDITY_PERIOD,
    };

    const jwt = await buildJwt(await getKey(config), newPayload);

    return new Response(
      JSON.stringify({
        ...newPayload,
        user: await config.decorateSessionUser(newPayload.user),
      }),
      {
        headers: {
          "content-type": "application/json",
          "set-cookie": formatJwtCookie(cookieConfig, jwt),
        },
        status: 200,
      },
    );
  } catch {
    return new Response("Not Allowed", {
      headers: {
        "content-type": "application/json",
        "set-cookie": formatJwtCookie(cookieConfig, "", -1),
      },
      status: 403,
    });
  }
}

export async function POST(config: Config, req: NextRequest) {
  const requestUrl = new URL(req.url);
  const cookieConfig =
    typeof config.cookies === "function" ? config.cookies(req) : config.cookies;

  if (requestUrl.pathname === SIGN_OUT_ENDPOINT) {
    return new Response("", {
      headers: {
        "content-type": "application/json",
        "set-cookie": formatJwtCookie(cookieConfig, "", -1),
      },
      status: 200,
    });
  } else if (requestUrl.pathname === SIGN_IN_ENDPOINT) {
    try {
      const fd = await req.formData();

      const user = await signInUser(
        formdata.getString(fd, "email"),
        formdata.getString(fd, "password"),
      );

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        exp: new Date().getTime() + VALIDITY_PERIOD,
      };

      const key = await getKey(config);
      const jwt = await buildJwt(key, payload);

      return new Response(
        JSON.stringify({
          ...payload,
          user: await config.decorateSessionUser(payload.user),
        }),
        {
          headers: {
            "content-type": "application/json",
            "set-cookie": formatJwtCookie(cookieConfig, jwt),
          },
          status: 200,
        },
      );
    } catch {
      return new Response(
        JSON.stringify({ error: "Incorrect username / password" }),
        {
          headers: {
            "content-type": "application/json",
            "set-cookie": formatJwtCookie(cookieConfig, "", -1),
          },
          status: 400,
        },
      );
    }
  }

  return new Response("Not Found", { status: 404 });
}
