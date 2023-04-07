import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
// var firstName, lastName, emailId
var fullName, status, email
const USER_BASE_URL="http://localhost:8080/api/v1/users"

export const authOptions = {
  // Configure one or more authentication providers
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "Credentials",
        async authorize(credentials, req){
          //check user exists
          const result = await fetch(USER_BASE_URL + '/' + credentials.email)
          if(!result.ok){
            throw new Error("Please register first")
          }
          const resultJson = await result.json()
          
          //check password belongs to user
          const checkPassword = await compare(credentials.password, resultJson.password)
          if(!checkPassword || resultJson.emailId != credentials.email){
            throw new Error("Email and Password don't match")
          }

          //set for session
          email = resultJson.emailId
          fullName = resultJson.fullName
          status = resultJson.status

          return resultJson
        }
      })
  ],

  secret: process.env.NEXT_PUBLIC_SECRET,
  

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user=user
        
      }
      delete token.user['password']
      return token
    },
    async session({ session, token, user }) {
          session.user = token.user
          return session
        }
  }
}
export default NextAuth(authOptions)