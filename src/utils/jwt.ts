
export interface jwtInfoType {
  user_id: number;
  role: number;
  exp : number;
  iss: string;

}


export function parseToken(token : string) :jwtInfoType {
  let payload = token.split(".")[1];
  return JSON.parse(decodeURIComponent(escape(window.atob(payload.replace(/-/g, "+").replace(/_/g, "/")))))
}


