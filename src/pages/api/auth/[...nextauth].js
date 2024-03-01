import { AuthOptions } from "next-auth";
import prisma from "../../../../lib/prismadb";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),

		Credentials({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "text",
				},

				password: {
					label: "Password",
					type: "password",
				},
			},

			async authorize(credentials) {
				console.log("trying to authenticate");
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password is required");
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user?.hashedPassword) {
					throw new Error("Email does not exit");
				}

				const isCorrectPassword = await compare(
					credentials.password,
					user.hashedPassword
				);

				if (!isCorrectPassword) {
					throw new Error("Incorrect password");
				}

				console.log("returning user", user);
				return user;
			},
		}),
	],
	adapter: PrismaAdapter(prisma),

	session: {
		//fucking christ spell the thing correctly
		strategy: "jwt",
	},

	debug: process.env.NODE_ENV === "development",
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			//looks like this runs when I open protected route
			//I only got user
			console.log(
				"this is the signIn nextauth definition:",
				"user:",
				user,
				"account:",
				account,
				"profile:",
				profile,
				"email:",
				email,
				"credentials:",
				credentials
			);
			const isAllowedToSignIn = true;
			if (isAllowedToSignIn) {
				return true;
			} else {
				return false;
			}
		},

		async jwt({ token, account, profile }) {
			console.log(
				"accessing session using jwt",
				"token:",
				token,
				"account:",
				account,
				"profile:",
				profile
			);
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token;
				token.id = profile?.id;
				token.url = profile?.avatar_url;
			}
			return token;
		},

		async session({ session, token, user }) {
			//remember only user is passed here
			//this and only signIn runs
			console.log(
				"this is the session callback",
				"session:",
				session,
				"token:",
				token,
				"user:",
				user
			);
			// Send properties to the client, like an access_token and user id from a provider.
			// if (token) {
			// 	session.accessToken = token?.accessToken;
			// 	session.user.id = token?.id;
			// }
			session.user.url = token.url;
			return session;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			console.log("url:", url, "baseUrl:", baseUrl);

			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) {
				console.log(url, baseUrl);
				console.log("else if block ran");
				return url;
			}
			console.log("default block ran in redirect");

			return baseUrl;
		},
	},

	events: {
		async signIn(message) {
			console.log("signIn event", message);
		},
		async signOut(message) {
			console.log("signOut event", message);
		},
		async createUser(message) {
			console.log("create User event", message);
		},
		async updateUser(message) {
			console.log("updateUser event", message);
		},
		async linkAccount(message) {
			console.log("link account event", message);
		},
		async session(message) {
			console.log("session event", message);
		},
	},
	pages: {
		signIn: "/",
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
