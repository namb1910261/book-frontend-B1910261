<script>
export default {
    props: {
        category: { type: Object, required: true },
    },
};
</script>
<template>
    <!-- <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ category.name }}
        </div>
    </div> -->
    <div class="d-flex my-1">
        <div class="card col-12">
            <div class="card-header">
                <b>
                    Chi tiết thể loại
                    <i class="fas fa-list-alt"></i>
                </b>
            </div>
            <p class="mx-4">{{ category.name }}</p>
        </div>
    </div>
</template>