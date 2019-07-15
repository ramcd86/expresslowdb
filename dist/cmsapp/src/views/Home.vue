<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{instance}}
    <component v-bind:is="BannerBlock" />
  </div>
</template>

<script>
import Vue from "vue";
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

// blocks
import FormBlock from "@/blocks/FormBlock.vue";
import TextBlock from "@/blocks/TextBlock.vue";
import ImageBlock from "@/blocks/ImageBlock.vue";
import FooterBlock from "@/blocks/FooterBlock.vue";
import HeaderBlock from "@/blocks/HeaderBlock.vue";
import BannerBlock from "@/blocks/BannerBlock.vue";
import TeaserBlock from "@/blocks/TeaserBlock.vue";
import JumbotronBlock from "@/blocks/JumbotronBlock.vue";
import LinkListBlock from "@/blocks/LinkListBlock.vue";
import NewsletterBlock from "@/blocks/NewsletterBlock.vue";
import BlogListingBlock from "@/blocks/BlogListingBlock.vue";
import ImageWithTextBlock from "@/blocks/ImageWithTextBlock.vue";

//pages
import BlogPage from "@/pages/BlogPage.vue";
import AboutPage from "@/pages/AboutPage.vue";
import ContactPage from "@/pages/ContactPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import StandardPage from "@/pages/StandardPage.vue";
import BlogListingPage from "@/pages/BlogListingPage.vue";

export default {
  name: "home",

  data() {
    return {
      helloWorld: HelloWorld,
      formBlock: FormBlock,
      textBlock: TextBlock,
      imageBlock: ImageBlock,
      footerBlock: FooterBlock,
      headerBlock: HeaderBlock,
      bannerBlock: BannerBlock,
      teaserBlock: TeaserBlock,
      jumbotronBlock: JumbotronBlock,
      linkListBlock: LinkListBlock,
      newsletterBlock: NewsletterBlock,
      blogListingBlock: BlogListingBlock,
      imageWithTextBlock: ImageWithTextBlock,
      blogPage: BlogPage,
      aboutPage: AboutPage,
      contactPage: ContactPage,
      landingPage: LandingPage,
      standardPage: StandardPage,
      blogListingPage: BlogListingPage
    };
  },

  components: {
    HelloWorld,
    FormBlock,
    TextBlock,
    ImageBlock,
    FooterBlock,
    HeaderBlock,
    BannerBlock,
    TeaserBlock,
    JumbotronBlock,
    LinkListBlock,
    NewsletterBlock,
    BlogListingBlock,
    ImageWithTextBlock,
    BlogPage,
    AboutPage,
    ContactPage,
    LandingPage,
    StandardPage,
    BlogListingPage
  }
};
</script>
