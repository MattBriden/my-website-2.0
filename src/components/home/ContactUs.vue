<template>
  <div id="contact-us">
    <h1>Talk is cheap...</h1>
    <p>
      And that's why we'll give it to you for free! Send us an email about your project and we can discuss potential solutions at no cost.
    </p>
    <div class="form-div">
      <form @submit="sendEmail" class="form">
        <div class="message">
          <textarea
              name="message"
              v-model="message"
              cols="30" rows="5"
              placeholder="Message">
          </textarea>
        </div>
        <div class="input-field" id="email">
          <input
              type="email"
              v-model="email"
              name="email"
              placeholder="Email Address"
          >
        </div>
        <div class="input-field" id="name">
          <input
              type="text"
              v-model="name"
              name="name"
              placeholder="Full Name"
          >
        </div>
        <div class="input-field" id="submit">
          <input type="submit" value="Send">
        </div>
      </form>
    </div>
    <div>
      <hr/>
      &#169; {{ new Date().getFullYear() }} | All Rights Reserved | Briden Solutions LLC
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail(e) {
      e.preventDefault();
      try {
        emailjs.sendForm('service_ivh8krh', 'template_9evvof5', e.target, 'user_zMie36DcU8MuGs1M5BqV1',
            {
              name: this.name,
              email: this.email,
              message: this.message
            });

      } catch(error) {
        console.log({error});
        this.$notify({
          type: 'error',
          title: 'Error Sending Email',
          text: 'We aplogize for the inconvenience but there was an error while processing your message.' +
              'Please send an email to admin@amenitymatch.com for assistance.'
        });
      }

      this.name = '';
      this.email = '';
      this.message = '';
      this.$notify({
        type: 'success',
        title: 'Thank you for your email!',
        text: 'Someone from the Amenity Match team will reach out to you shortly.'
      });
    },
  }
}
</script>

<style scoped>
#contact-us {
  background-color: #e1e1e1;
  padding-top: 10px;
  padding-bottom: 10px;
  color: black;
}
p {
  margin: 0;
  margin-right: 15%;
  margin-left: 15%;
  min-width: 70%;
}
.form-div {
  display: block;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
}
.form-div form {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(12, 1fr);
  margin-left: 15%;
  margin-right: 15%;
}
.form-div .message {
  grid-column: span 12;
  padding-bottom: 15px;
}
.input-field {
  grid-column: span 4;
  padding-bottom: 15px;
}
.input-field input {
  font-size: 15px;
  padding: 7px;
}
#email {
  padding-right: 7px;
}
#submit{
  padding-left: 7px;
}
.form-div textarea {
  width: 100%;
  resize: none;
  font-family: inherit;
  font-size: 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.form-div input {
  font-family: inherit;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
}

@media screen and (max-width: 600px) {
  .input-field {
    grid-column: span 12;
  }
  #email, #submit {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
