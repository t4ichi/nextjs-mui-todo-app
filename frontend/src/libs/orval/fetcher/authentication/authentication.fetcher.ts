/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Todo App API
 * Todo管理アプリケーションのAPI
 * OpenAPI spec version: 1.0.0
 */
import type {
  ApiError,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse
} from '../../schemas';


/**
 * 新規ユーザー登録を行う
 * @summary ユーザー登録
 */
export type signUpResponse201 = {
  data: SignUpResponse
  status: 201
}

export type signUpResponse400 = {
  data: ApiError
  status: 400
}
    
export type signUpResponseComposite = signUpResponse201 | signUpResponse400;
    
export type signUpResponse = signUpResponseComposite & {
  headers: Headers;
}

export const getSignUpUrl = () => {


  

  return `https://example.com/sign-up`
}

export const signUp = async (signUpRequest: SignUpRequest, options?: RequestInit): Promise<signUpResponse> => {
  
  const res = await fetch(getSignUpUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      signUpRequest,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: signUpResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as signUpResponse
}


/**
 * メールアドレスとパスワードでサインインする
 * @summary ユーザーサインイン
 */
export type signInResponse200 = {
  data: SignInResponse
  status: 200
}

export type signInResponse400 = {
  data: ApiError
  status: 400
}
    
export type signInResponseComposite = signInResponse200 | signInResponse400;
    
export type signInResponse = signInResponseComposite & {
  headers: Headers;
}

export const getSignInUrl = () => {


  

  return `https://example.com/sign-in`
}

export const signIn = async (signInRequest: SignInRequest, options?: RequestInit): Promise<signInResponse> => {
  
  const res = await fetch(getSignInUrl(),
  {      
    ...options,
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    body: JSON.stringify(
      signInRequest,)
  }
)

  const body = [204, 205, 304].includes(res.status) ? null : await res.text()
  const data: signInResponse['data'] = body ? JSON.parse(body) : {}

  return { data, status: res.status, headers: res.headers } as signInResponse
}


