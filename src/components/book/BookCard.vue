<script>
export default {
    props: {
        book: { type: Object, required: true },
    },
};
</script>
<template>
    <div>
        <div class="p-1">
            <strong>Tên:</strong>
            {{ book.name }}
        </div>
        <div class="p-1">
            <strong>Hình:</strong>
            <br>
            <img :src="'./book_image/' + book.image" :alt="book.name">
        </div>
        <div class="p-1">
            <strong>Yêu thích:</strong>
            {{ book.favorite }}
        </div>
        <div class="p-1">
            <strong>Thể loại:</strong>
            {{ book.category_id.name }}
        </div>
        <div class="p-1">
            <strong>User:</strong>
            {{ book.user_id }}
        </div>
    </div>
</template>