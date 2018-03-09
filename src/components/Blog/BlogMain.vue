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
          :edit="handleEditContent"
          :changeType="handleContentTypeChange"
          v-for="(blog,i) in blogList"
          :key="i">
        </app-blog-list>
      </div>
    </div>
    <app-new-blog-post
      :blogPost="blogPost"
      :newContent="handleAddContent"
      :upload="handleUploadImage"
      :submit="handleBlogPostSubmit"
      :close="handleClose" v-else>
    </app-new-blog-post>
  </div>
</template>

<script>
  import {db, app} from '../../firebase';
  import appBlogList from './BlogList';
  import appNewBlogPost from './NewBlogPost';

  export default {
    data() {
      return {
        viewContentType: -1,
        blogPost: null,
        loading: true,
        uploadedImageUrl: [],
        isPreviousPostEdit: false,
        key: ''
      }
    },
    components: {
      appBlogList,
      appNewBlogPost
    },
    methods: {
      handleContentTypeChange(blog) {
        if (blog.type === 0) {
          db.ref('blogs').child(blog['.key']).child('type').set(1);
        }
        else {
          db.ref('blogs').child(blog['.key']).child('type').set(0);
        }
      },
      handleClose() {
        this.isPreviousPostEdit = false;
        this.blogPost = null;
      },
      onNewBlogPost() {
        this.blogPost = {
          author: app.auth().currentUser.email,
          content: [{
            body: '',
            image: ''
          }],
          date: this.formatDate(new Date()),
          hook: '',
          title: '',
          type: 0
        };
      },
      handleAddContent() {
        this.blogPost.content.push({
          body: '',
          image: ''
        });
      },
      handleBlogPostSubmit() {
        if (this.isPreviousPostEdit) {
          db.ref('blogs').child(this.key).set(this.blogPost).then(() => {
            alert("New Post Added!!");
            this.blogPost = null;
          });
          this.isPreviousPostEdit = false;
        } else {
          db.ref('blogs').push(this.blogPost).then(() => {
            alert("New Post Added!!");
            this.blogPost = null;
          });
        }
      },
      handleUploadImage(image) {
        const upload = app
          .storage()
          .ref(`blog/${image.name}`)
          .put(image);
        upload.on('state_changed', snapshot => {
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        });
        return upload.then(fileData => fileData.metadata.downloadURLs[0]);
      },
      formatDate(date) {
        let monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;
      },
      handleEditContent(blog) {
        this.blogPost = {
          author: blog.author,
          content: blog.content,
          date: this.formatDate(new Date()),
          hook: blog.hook,
          title: blog.title,
          type: blog.type
        };
        this.isPreviousPostEdit = true;
        this.key = blog['.key']
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
