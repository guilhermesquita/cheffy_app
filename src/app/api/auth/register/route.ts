import { NextResponse } from 'next/server';
import { registerSchema } from '../[validators]/registerSchema';
import { registerFactory } from '@/features/auth/main/factory/registerFactory';
import { CheffyAppError } from '@/features/error/CheffyAppError';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = registerSchema.safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.flatten() },
        { status: 400 }
      );
    }

    const registerProfile = registerFactory();
    const result = await registerProfile.register(parsedBody.data);

    return NextResponse.json(result, { status: 201 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if(error instanceof CheffyAppError){
      return NextResponse.json(
        { error: error.response },
        { status: error.response.code } 
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Erro interno do servidor' },
      { status: 500 } 
    );
  }
}