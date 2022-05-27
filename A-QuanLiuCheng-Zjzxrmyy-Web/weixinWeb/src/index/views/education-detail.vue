<template>
  <div style="background-color:#fff;">
    <div style="padding: 2em 0;">
      <h1 style="color:#de7c23;text-align:center;font-size:20px;font-weight:200;margin:0 15%;">{{title}}</h1>
    </div>
    <article class="weui_article">
      <section>
        <section>
          {{{content}}}
        </section>
      </section>
    </article>
    <partial name="footer-copyright"></partial>
  </div>
</template>
<script>
export default {
  name: 'EducationDetailView',
  data: function () {
    return {
      educationId: this.$route.params.educationId,
      title: '',
      content: ''
    }
  },
  ready: function () {
    var self = this
    this.$ajax.get('GetEducationKnowlgDetail', 'Education', { educationId: this.educationId }).then(function (data) {
      if (data.ResultCode === '0') {
        self.title = data.Title
        self.content = data.Content
      }
    })
  }
}
</script>
