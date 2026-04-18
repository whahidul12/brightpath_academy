"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";

export default function SignInModal() {
  return (
    <div>
      <SignIn.Root>
        <SignIn.Step name="start">
          <h1>BrightPath Academy</h1>
          <h2>Sign in to your account</h2>
          <Clerk.GlobalError />
          <Clerk.Field name="username">
            <Clerk.Label>Username</Clerk.Label>
            <Clerk.Input required />
            <Clerk.FieldError />
          </Clerk.Field>
          <Clerk.Field name="password">
            <Clerk.Label>Password</Clerk.Label>
            <Clerk.Input type="password" required />
            <Clerk.FieldError />
          </Clerk.Field>
          <SignIn.Action submit>Sign In</SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
}
