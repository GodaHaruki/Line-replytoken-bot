import { doGet } from "./doGet";
import { doPost } from "./doPost";

(global as any).doPost = doPost;
(global as any).doGet = doGet;