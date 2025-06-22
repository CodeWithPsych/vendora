import dbConnect from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { mailer } from "@/helpers/mailer";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/schemas/signUpSchema";  

export async function POST(request) {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate request body using imported schema
    const validation = signUpSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Account already exists with this email",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const subject = "Vendora Cart";
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="color: #4CAF50;">Welcome to Vendora Cart!</h1>
        <p>Hi there,</p>
        <p>Thank you for signing up with <strong>Vendora Cart</strong>. We're excited to have you on board!</p>
        <p>Your account has been successfully created using this email address. You can now start exploring a wide range of products and enjoy a smooth shopping experience.</p>
        <p>If you didn't sign up for this account, please ignore this message or contact our support team immediately.</p>
        <br>
        <p>Happy shopping!</p>
        <p>— The Vendora Cart Team</p>
      </div>
    `;

    try {
      await mailer({ to: email, subject, html });
    } catch (mailError) {
      console.error("Email sending failed:", mailError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send verification email",
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully. Verification email sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error registering user",
      },
      { status: 500 }
    );
  }
}
