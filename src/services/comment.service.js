import createApiClient from "./api.service";
class CommentService {
    constructor(baseUrl = "/api/comments") {
        this.api = createApiClient(baseUrl);
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async deleteByUserId(userid) {
        return (await this.api.delete(`/comments_user_id/delete/${userid}`)).data;
    }
    async findAllCommentByUserId(userid) {
        return (await this.api.get(`/comments_user_id/${userid}`)).data;
    }
    async findAllCommentByReviewId(reviewid) {
        return (await this.api.get(`/comments_review_id/${reviewid}`)).data;
    }
}
export default new CommentService();