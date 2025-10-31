import type { baseResponse, listDataType, paramsType } from "@/api/index";
import { useAxios } from "@/api/index";

export interface commentArticleType {
  title: string;
  id: string;
  count: number;
}

export interface CommentArticleListType extends paramsType {
  title?: string;
}

export function commentArticleListApi(
  params: CommentArticleListType
): Promise<baseResponse<listDataType<commentArticleType>>> {
  return useAxios.get("/api/comments/articles", { params });
}


export interface commentUserType {
  addr: string;
  avatar: string;
  ip: string;
  nickname: string;
}

export interface commentType {
  article_id: string;
  comment_count: number;
  content: string;
  created_at: string;
  digg_count: number;
  id: number;
  parent_comment_id: number | null; // 父评论id
  user: commentUserType;
  sub_comments: commentType[];
  user_id: number;

  applyContent: string; // 人为加上的
  isApply: boolean; // 是否显示回复的那个组件
}

export function commentListApi(
  id: string,
): Promise<baseResponse<listDataType<commentType>>> {
  return useAxios.get("/api/comments/" + id);
}

export function commentDeleteApi(id: number): Promise<baseResponse<string>> {
  return useAxios.delete("/api/comments/" + id.toString());
}

export interface commentAddType {
  article_id: string;
  content: string;
  parent_comment_id?: number;
}

export function commentCreateApi(
  data: commentAddType
): Promise<baseResponse<string>> {
  return useAxios.post("/api/comments", data);
}


export interface CommentDiggData {
  is_digg: boolean; // 后端返回的"是否点赞"状态
}

export function commentDiggApi(id: number): Promise<baseResponse<CommentDiggData>> {
  return useAxios.get("/api/comments/digg/" + id.toString());
}
