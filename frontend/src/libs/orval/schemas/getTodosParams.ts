/**
 * Generated by orval v7.9.0 🍺
 * Do not edit manually.
 * Todo App API
 * Todo管理アプリケーションのAPI
 * OpenAPI spec version: 1.0.0
 */

export type GetTodosParams = {
/**
 * 完了済みタスクのみ取得する場合はtrue、未完了のみはfalse。指定なしは全て。
 */
completed?: boolean;
limit?: number;
offset?: number;
};
