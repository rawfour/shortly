// import Vue from 'vue';

Vue.component("loader", {
  template: `
  <div class="snippet" data-title=".dot-flashing">
  <div class="stage">
    <div class="dot-flashing"></div>
  </div>
  </div>
  `
})

Vue.component("url-card", {
  props: ["item"],
  template: `
  <div  class="link-card">
    <span class="link-card__old-link">{{ excerptText(item.original_link) }}</span>
    <a :href="item.full_short_link" target="_blank" class="link-card__new-link">{{ item.full_short_link }}</a>
    <button class="button button--secondary">Copy</button>
  </div>
  `,
  methods: {
    excerptText: function(text){
      const characters = text.replace(/\s+/g, '').length;
      if(characters >= 70){
        text = text.substring(0, 70) + "...";
      }
      return text;
    }
  }
  
})

new Vue({
    el: "#app",
    data: {
        url: "",
        shortUrl: [],
        isLoading: false,
        isError: false
    },
    methods: {
        startLoading: function(){
          this.isLoading = true;
        },
        endLoading: function(){
          this.isLoading = false;
        },
        collectUrl: function(data){
          this.shortUrl = [...this.shortUrl, data];
        },
        shortLink: function(){
            this.startLoading();
            fetch(`https://api.shrtco.de/v2/shorten?url=${this.url}`)
              .then(response =>  response.json())
              .then(data => {
                this.endLoading();
                if(data.ok){
                  this.collectUrl(data.result);
                } else{
                  this.isError = true;
                }
              })
              .catch(() => {
                this.endLoading();
                this.isError = true;
              });


        }
    }
})