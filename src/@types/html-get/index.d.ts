declare module 'html-get' {
  export interface IGetHTMLResponse {
    url: string;
    html: string;
    stats: object;
    headers: object;
    statusCode: number;
  }

  export default function getHTML(url: string): Promise<IGetHTMLResponse>;
}
