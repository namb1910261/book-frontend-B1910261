<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
};
</script>
<template class="page">
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-header">
                <b>
                    Chi tiết User
                    <i class="fas fa-user"></i>
                </b>
            </div>
            <div class="mx-4">
                <strong>Tên:</strong>
                {{ user.name }}
            </div>
            <div class="mx-4">
                <strong>Email:</strong>
                {{ user.email }}
            </div>
            <div class="mb-4 mx-4">
                <strong>Vai trò:</strong>
                {{ user.role }}
            </div>
        </div>
    </div>
</template>