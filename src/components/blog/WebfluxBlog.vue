<template>
  <div id="blog-post">
    <BlogNavBar></BlogNavBar>
    <div class="scrollable">
      <div class="blog">
        <div class="title">
          <span>Spring Webflux</span>
          <p>Matt Briden • January 10, 2021</p>
          <img src="~@/assets/profile-pic.png" height="100"/>
          <div class="contact-icons">
            <a href="mailto: matt@helioswebsolutions.com">
              <font-awesome-icon icon="envelope" size="1x" :style="{ color: '#D4AC0D' }"/>
            </a>
            <a href="https://www.github.com/MattBriden" target="_blank">
              <font-awesome-icon :icon="['fab', 'github']" size="1x" :style="{ color: 'black' }"/>
            </a>
            <a href="https://www.linkedin.com/in/mattbriden/" target="_blank">
              <font-awesome-icon :icon="['fab', 'linkedin']" size="1x" :style="{ color: '#2867B2' }"/>
            </a>
          </div>
        </div>
        <div class="card">
          <h3>Too much data? Reactive APIs can help</h3>
          <p>
            I recently ran into an issue where an endpoint in a RESTful Spring API I manage would timeout depending on the amount of data it was trying to return. The logic behind the endpoint was simple; retrieve the last 6 months worth of data from the DB, convert each entity into a DTO, and when complete return the entire data set to the front end application. When the product was new with few customers using it this worked great. But now 4 years into existence we have larger datasets and larger customers and this strategy proved to not scale well. Some of our larger customers have upwards of 160,000 data entries in the 6 month period we were querying and the page became completely unresponsive.
          </p>
          <p>
            Looking for a solution I stumbled upon the <a href="https://www.baeldung.com/spring-webflux" target="_blank">Spring WebFlux</a> framework. The idea behind Spring WebFlux is that it's non-blocking and reactive. Instead of a data set being returned all at once, it gets returned to the client as a stream. By doing this the client doesn't have to sit around waiting for the API response, it can update the necessary components with data as it gets returned from the API and the rest of the page can load indpendently. This paradigm can help applications scale and perfrom at a much better rate, especially those that deal with large amounts of data.
          </p>
          <h3>Building a reactive API with Spring WebFlux</h3>
          <p>
            Building the bare bones and infrastructure of a Spring WebFlux API proved to be straightforward. For this POC I used Apache Maven as the build tool and stood up a PostgreSQL DB behind the API. To use traditional Spring Data Repositories in a reactive way we leverage Spring Data R2DBC insted of JDBC. R2DBC stands for Reactive Relational Database Connectivity and basically allows relational data access for reactive applications. Adding the following dependencies to the POM file is all that is needed for this implementation.
          </p>
          <pre><code>
      &lt;dependency&gt;
          &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
          &lt;artifactId&gt;spring-boot-starter-webflux&lt;/artifactId&gt;
      &lt;/dependency&gt;

      &lt;dependency&gt;
          &lt;groupId>io.r2dbc&lt;/groupId&gt;
          &lt;artifactId&gt;r2dbc-postgresql&lt;/artifactId&gt;
          &lt;scope&gt;runtime&lt;/scope&gt;
      &lt;/dependency&gt;

      &lt;dependency&gt;
          &lt;groupId&gt;org.springframework.boot&lt;/groupId&gt;
          &lt;artifactId&gt;spring-boot-starter-data-r2dbc&lt;/artifactId&gt;
      &lt;/dependency&gt;
          </code></pre>
          <p>
            Along with pulling in the R2DBC dependencies we will need to add the following properties to the application.properties/yml file to tell our application what DB to connect to.
          </p>
          <pre><code>
      spring.r2dbc.url=r2dbc:postgresql://postgres-db:5432/test
      spring.r2dbc.username=testUser
      spring.r2dbc.password=password
          </code></pre>
          <p>
            To implement a data layer for this application we need to create an entity class and a repository interface. The entity being used in this example is a class called Animal; a POJO with a few properties.
          </p>
          <pre><code>
      public class Animal {

          @Id
          private String id;

          private String name;

          private String kingdom;
      }
          </code></pre>
          <p>
            Once an entity is defined we can create a repository interface that extends ReactiveCrudRepository to access the data in a reactive way. Similar to the CrudRepository interface used by many JDBC repositories, ReactiveCrudRepository provides us with the basic CRUD methods.
          </p>
          <pre><code>
      public interface IAnimalRepository extends ReactiveCrudRepository&lt;Animal, String&gt; {
      }
          </code></pre>
          <p>
            Similarly to spplications using JDBC, we need to create a configuration class to tell Spring to create an IAnimalRepository bean and realize where our persistence entity is located. This can be accomplished by using the @EnableR2dbcRepositories and @EntityScan annotations.
          </p>
          <pre><code>
      @Configuration
      @EnableR2dbcRepositories(basePackages = "com.briden.flux.repository")
      @EntityScan(basePackages={"com.briden.flux.entity"})
      public class AppConfig {
      }
          </code></pre>
          <p>
            Finally we are ready to make our Spring WebFlux controller class. Following the trend of the other classes, it is easy to see the similarities to the Spring MVC framework. However, there are two main differences that need pointed out. Firstly, the return type of the controller is, fittingly, Flux. Flux originates from <a href="https://projectreactor.io/docs/core/release/reference/" target="_blank">Project Reactor</a> and at its most basic level is a publsiher that feeds a collection of data to the subscriber asynchronously. Secondly, the content-type of the returned data is application/stream+json. This tells the client that the data will be returned in a stream of data. For the purposes of this example I put a one second delay between each item being returned to exaggerate the behavior of Flux.
          </p>
          <pre><code>
      @RestController
      @RequestMapping("/api/animal")
      public class AnimalController {

          @Autowired
          private IAnimalRepository animalRepository;

          @GetMapping(produces = MediaType.APPLICATION_STREAM_JSON_VALUE)
          public Flux&lt;AnimalResource&gt; findAll() {
              return animalRepository.findAll()
              .map(AnimalResource::new)
              .delayElements(Duration.ofSeconds(1L));
          }
      }
          </code></pre>
          <p>
            And we are done! The behavior of Spring WebFlux can be realized by curling the endpoint we just created. Notice how each data entry is part of its own JSON object.
          </p>
          <pre><code>
      $ curl localhost:8090/api/animal -i
      HTTP/1.1 200 OK
      transfer-encoding: chunked
      Content-Type: application/stream+json

      {"id":"61de7d7e-d5d5-4772-9c56-0115381e8205","name":"Cat","kingdom":"Vertebrate"}
      {"id":"61a55942-aa86-402c-a3be-d4ccd18ae2ff","name":"Jellyfish","kingdom":"Invertebrate"}
      {"id":"c6aa1de4-81fd-4336-a69a-0bf9400e633f","name":"Cat","kingdom":"Vertebrate"}
      {"id":"2c643272-83c8-4a7b-a65f-413f7bb27b1b","name":"Jellyfish","kingdom":"Invertebrate"}
      {"id":"4beb08f6-2583-41d5-a394-3d87276df7eb","name":"Jellyfish","kingdom":"Invertebrate"}
      {"id":"3ea559d8-3c1b-4c8c-81a4-52cd04152116","name":"Cat","kingdom":"Vertebrate"}
      {"id":"34d913cf-124e-4ceb-ab39-0fa2a303c782","name":"Worm","kingdom":"Invertebrate"}
      {"id":"aefb3f7e-f2da-493b-a303-e1e42840623a","name":"Jellyfish","kingdom":"Invertebrate"}
      {"id":"b66d2000-60fc-4a80-93c5-5b669596f36f","name":"Cat","kingdom":"Vertebrate"}
      {"id":"02c327a4-6f14-49bb-b850-9a2cd3a8586d","name":"Cat","kingdom":"Vertebrate"}
          </code></pre>
          <p>
            Spring WebFlux is easy to implement and can provide countless benefits for applications that deal with large amounts of data and have trouble scaling. In future iterations of this project I plan to explore how to implement a security layer for such applications as well as creating a front end that can act as a client to reactive APIs.
          </p>
          <p>
            Source code for this example can be found <a href="https://github.com/MattBriden/Spring-WebFlux-Example" target="_blank">here</a>.
          </p>
        </div>
      </div>
      <div>
        <hr/>
        &#169; {{ new Date().getFullYear() }} | All Rights Reserved | Briden Solutions LLC
      </div>
    </div>
  </div>

</template>

<script>

import BlogNavBar from '@/components/util/BlogNavBar';
export default {
  name: 'WebfluxBlog',
  components: {BlogNavBar}
}
</script>

<style scoped>
#blog-post {
  overflow: hidden;
  height: 100vh;
  background-color: #e1e1e1;
}
.scrollable {
  overflow: scroll;
  margin-top: 82px;
  height: calc(100% - 82px);
  position: fixed;
  overflow-x: hidden;
  max-width: 100%;
}
.blog .title {
  text-align: inherit;
  padding: 20px;
  background-color: white;
  font-family: Soleil_Bold,Helvetica,Arial,sans-serif;
  color: #333;
}
.blog .title span{
  font-size: 45px;
  font-weight: bold;
}
.contact-icons {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.contact-icons a {
  padding: 15px 10px 6px 20px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: inline-block;
}
.card {
  background-color: white;
  margin: 20px;
  padding: 50px;
  border-radius: 25px;
  text-align: initial;
  grid-column: span 6;
}
.card p {
  line-height: 2.0;
  font-size: 16px;
  font-family: "Lato", sans-serif;
}
.card a {
  text-decoration: none;
  font-weight: bold;
  color: #75ab38;
}
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  overflow: auto;
}
@media screen and (max-width: 700px) {
  .card {
    padding: 10px;
  }
}
</style>