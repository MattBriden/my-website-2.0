<template>
  <div id="signup">
    <h3>Tell Us Your Idea!</h3>
    <p>Enter your info to schedule a free consultation about how Helios can help make your dream a reality.</p>
    <div class="form-div">
      <form @submit="sendEmail" class="form">
        <div class="input-field" id="name">
          <input
              type="text"
              v-model="name"
              name="name"
              placeholder="Full Name"
          >
        </div>
        <div class="input-field" id="email">
          <input
              type="email"
              v-model="email"
              name="email"
              placeholder="Email Address"
          >
        </div>
        <div class="input-field" id="message">
          <textarea
              type="text"
              v-model="message"
              name="name"
              placeholder="How Can We Help?"
          ></textarea>
        </div>
        <div class="input-field" id="submit">
          <input type="submit" value="Submit">
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';
export default {
  name: 'Contact',
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
        this.$notify({
          type: 'error',
          title: 'Error Sending Email',
          text: 'We aplogize for the inconvenience but there was an error while processing your message.' +
              'Please send an email to matt@helioswebsolutions.com for assistance.'
        });
      }

      this.name = '';
      this.email = '';
      this.message = '';
      this.$notify({
        type: 'success',
        title: 'Thank you for your email!',
        text: 'Someone from the Helios team will reach out to you shortly.'
      });
    },
  }
}
</script>

<style scoped>
#signup {
  background-color: rgba(255,255,255, 0.8);;
  padding-top: 10px;
  border-radius: 10px;
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
}
.form-div form {
  display: grid;
  text-align: center;
  grid-template-columns: repeat(12, 1fr);
  margin-left: 15%;
  margin-right: 15%;
}
.input-field {
  grid-column: span 12;
  padding-bottom: 15px;
}
.input-field input {
  font-size: 15px;
  padding: 7px;
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
