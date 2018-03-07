<template>
  <div>
    <div class="ui basic segment">
      <label>View Content:</label>
      <select class="ui right floated dropdown" v-model="viewContentType">
        <option value="-1">View All</option>
        <option value="1">Published</option>
        <option value="0">Archived</option>
      </select>
      <div class="ui right floated primary button">Create New Post</div>
    </div>
    <div class="ui divided items">
      <app-blog-list :blog="blog" v-for="(blog,i) in blogList" :key="i"></app-blog-list>
    </div>
  </div>
</template>

<script>
  import {db} from '../../firebase';
  import appBlogList from './BlogList';

  export default {
    data() {
      return {
        viewContentType: -1
      }
    },
    components: {
      appBlogList
    },
    firebase: {
      blogs: {
        source: db.ref('blogs'),
        // this is called once the data has been retrieved from firebase
        readyCallback: function () {
          this.loading = false;
        }
      }
    },
    computed: {
      blogList() {
        return this.blogs.filter(blog => {
          if (parseInt(this.viewContentType) === -1) {
            return blog;
          }
          else if (blog.type === parseInt(this.viewContentType)) {
            return blog
          }
        })
      }
    }
  };
</script>

<style scoped>

</style>
