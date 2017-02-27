<template>
<h1>Profil</h1>
<p v-show="error">Erreur: {{ error }}</p>

<form action="/api/user/file/1"
      class="dropzone"
      id="myDropzone">
  <div class="dz-message needsclick">
    Déposez votre image ici ou cliquez pour ajouter une image.
  </div>
  </form>

<div id="preview-template" style="display: none;">
  <div class="dz-preview dz-file-preview">
    <div class="dz-progress">
      <span class="dz-upload" data-dz-uploadprogress></span>
  </div>
    <div class="dz-error-message">
      <span data-dz-errormessage></span>
  </div>
  </div>
  </div>

<div class="card">
  <img :src="user.image">
  <dl>
    <dd>Nom</dd><dd>{{ user.lastName }}</dd>
    <dd>Prénom</dd><dd>{{ user.firstName }}</dd>
    <dd>Email</dd><dd>{{ user.mail }}</dd>
  </dl>
  </div>
</template>

<script>
  import auth from '../auth'
  import Dropzone from 'dropzone'
  export default {
    data() {
      return {
        user: {},
        error: '',
        id: 1,
      }
    },
    ready() {
      this.updateUser();

      var myDropzone = new Dropzone("#myDropzone", { 
        url: "/api/user/file/1", 
        previewTemplate: document.getElementById('preview-template').innerHTML
      });

      // Update image when file is successfuly uploded
      var vm = this;
      myDropzone.on('success', function(file) {
        vm.updateUser();
      })
    },
    methods: {
      updateUser() {
        this.$http.get('/api/user/'+this.id).then((response) => {
          if(response.data && response.data.error) {
            this.$set('error', response.data.message)
          } else {
            this.$set('user', response.data);
          }
        }, (err) => {
          console.error(err)
        })
      }
    },
    route: {
      canActivate(transition) {
        !auth.checkAuth() ? transition.redirect('/login') : transition.next()
      }
    },
  }
</script>

<style lang="sass" scoped>
img {
  width: 300px;
  display: block;
  margin-bottom: 10px;
  }
.dropzone.dz-clickable {
  cursor: pointer;
  }
.dropzone {
  border: 2px dashed #0087F7;
  border-radius: 5px;
  background: white;
  min-height: 25px;
  width: 245px;
  padding: 25px;
  }
</style>