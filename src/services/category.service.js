import createApiClient from "./api.service";
class CategoryService {
    constructor(baseUrl = "/api/categorys") {
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
        return (await this.api.delete(`/categorys_user_id/delete/${userid}`)).data;
    }
    async findAllCategoryByUserId(userid) {
        return (await this.api.get(`/categorys_user_id/${userid}`)).data;
    }
}
export default new CategoryService();