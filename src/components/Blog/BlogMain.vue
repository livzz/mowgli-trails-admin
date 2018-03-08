<template>
  <div>
    <!--<div class="ui header centred aligned">Blog Page</div>-->
    <div v-if="blogPost === null">
      <div class="ui basic segment">
        <label>View Content:</label>
        <select class="ui right floated dropdown" v-model="viewContentType">
          <option value="-1">View All</option>
          <option value="1">Published</option>
          <option value="0">Archived</option>
        </select>
        <div class="ui right floated primary button" @click="onNewBlogPost">Create New Post</div>
      </div>
      <div class="ui raised segment loading inverted black" v-if="loading">
        <br>
        <br>
        <br>
      </div>
      <div class="ui divided items" v-else>
        <app-blog-list
          :blog="blog"
          :changeType="toggleContentType"
          v-for="(blog,i) in blogList"
          :key="i">
        </app-blog-list>
      </div>
    </div>
    <app-new-blog-post :blogPost="blogPost" :close="closeNewBlogPost" v-else></app-new-blog-post>
  </div>
</template>

<script>
  import {db} from '../../firebase';
  import appBlogList from './BlogList';
  import appNewBlogPost from './NewBlogPost';

  export default {
    data() {
      return {
        viewContentType: -1,
        blogPost: null,
        loading: true
      }
    },
    components: {
      appBlogList,
      appNewBlogPost
    },
    methods: {
      toggleContentType(blog) {
        if (blog.type === 0) {
          db.ref('blogs').child(blog['.key']).child('type').set(1);
        }
        else {
          db.ref('blogs').child(blog['.key']).child('type').set(0);
        }
      },
      closeNewBlogPost() {
        this.blogPost = null;
      },
      onNewBlogPost() {
        this.blogPost = {};
        this.blogPost.content = [{
          body: '',
          image: ''
        }];
      }
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
