<template>
  <div id="blog-post">
    <BlogNavBar></BlogNavBar>
    <div class="scrollable">
      <div class="blog">
        <div class="title">
          <span>Machine Learning with Python</span>
          <p>Matt Briden • March 2, 2021</p>
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
          <h3>Intimidated by "Maching Learning"?</h3>
          <p>Lots of developers are. Up to this point in my career I've mostly worked on web applications where process trumps algorithms when it comes to what my day to day work consists of. I always assumed that machine learning was over my intelligence level, something too complex for a simple application developer like myself to understand. Between watching YouTube videos of Boston Dynamic's robo-dogs and browsing the insane qualifications listed on jop openings for ML developers it seemed to be something I would never be able to grasp.</p>
          <p>With the technology world evolving quickly I decided to make it a point to start learning about ML algorithms. What I learned was: <b>they're not as complicated as I thought</b>. I found that with a basic understanding of the underlying algorithms there are open sourced tools and libraries that make it easy to write ML applications. To prove this to myself I decided create a simple project that provides a solution to a popular machine learning problem. The <a href="https://machinelearningmastery.com/types-of-classification-in-machine-learning/" target="_blank">popular ML problem</a> I decided to tackle was SPAM detection.</p>
          <h3>The Ham / Spam Classifier</h3>
          <p>Most people are familiar with the term "spam", it's commonly used to describe any type of unsolicited communication sent to the masses. Ham, on the other hand, is everything else: harmless and expected communication. The goal of this project is to create an application that can accurately determine if an SMS message is ham or spam.</p>
          <p>The machine learning algorithm used for this project is a random forest classifier. Simply put the random forest classifier is built of independently created decision trees. Each decision tree will analyze an SMS text message and determine if it is "ham" or "spam". The results of all the decision trees will then be used to determine the classification of the message. The important thing to note is that each decision tree is created uniquely and thus the results are uncorrelated to one another. This provides us with an answer that is equivalent to asking the masses, believing that the decision of the many is more accurate than that of the few. Think of if you absolutely had to determine what day of the week it was. Do you think you'd get a more accurate answer from asking just one person or by taking the majority answer from 100 people? That is the underlying logic of the random forest algorithm and what makes it a great tool for classification problems.</p>
          <p><a target="_blank" href="https://towardsdatascience.com/understanding-random-forest-58381e0602d2">Here</a> is a more in-depth explanation of how random forests work.</p>
          <h3>How To Build the Model</h3>
          <p>This project is built with the help of <a target="_blank" href="https://scikit-learn.org/stable/">scikit-learn</a>. scikit-learn is a Python library that makes implementing machine learning algorithms easy. With a basic understanding of the algorithm we want to use, scikit-learn takes care of all the "hard" stuff and allows us to focus on implementation.</p>
          <p>We've already determined that random forest algorithms work well for classification problems, but they can only be powerful if they are trained with good data. This model is trained on a data set of 5575 text messages each being labeled as either "ham" or "spam". To create the random forest we first need to transform our training data in a manner that can be used by machine learning algorithms. The data is initially in the format shown below, with one column containing either "ham" or "spam" and the other containing the contents of the SMS message.</p>
          <pre><code>
      >>> data = pd.read_csv(_csv_file, encoding='ISO-8859-1')
      >>> data.head(5)

           v1                                                 v2
      0   ham  Go until jurong point, crazy.. Available only ...
      1   ham                      Ok lar... Joking wif u oni...
      2  spam  Free entry in 2 a wkly comp to win FA Cup fina...
      3   ham  U dun say so early hor... U c already then say...
      4   ham  Nah I don't think he goes to usf, he lives aro...
          </code></pre>
          <p>The v1 column that indicates "ham" or "spam" is easy to change, we can have "ham" be represented by 0 and "spam" by 1. The text column is a bit more tricky. To make the data processable by machine learning algorithms we need to tokenize and normalize each text. This is accomplished by using the CountVectorizer object from scikit-learn. This object takes each SMS message and turns each word, defined as a "feature", into a count of its occurrences. The CountVectorizer in this implementation only takes into account the most frequented 3000 words. A list of "stop words" is also applied to the CountVectorizer object so common words that don't help classification (think articles, pronouns, and prepositions) are not accounted into the top 3000 frequented word. Therefore each set of features, or tokenized and normalized representations of each text, will be an array of size 3000 with each object in the array being a count of how many times that word occurs in the text. Below is the implementation.</p>
          <pre><code>
      # replace "ham" and "spam" with 0 and 1
      cleanup_data = {"v1": {"ham": 0, "spam": 1}}
      data.replace(cleanup_data, inplace=True)
      y = data.iloc[:, 0].values

      # x values will be an array of the occurrences the words in each text tokenized by CountVectorizer
      x = []
      for i in range(0, len(data['v2'])):
          x.append(data['v2'][i])
      cv = CountVectorizer(max_features=3000)
      x = cv.fit_transform(x).toarray()
          </code></pre>
          <p>At this point the data is now in a format that can be used to create training and testing data for our model. scikit-learn makes it incredibly easy to generate this data and it can be done with a single line of code. In this implementation 75% of the data is used to train the model with the rest saved for testing. A random_state variable of 42 is used to seed the random number generator. This will ensure reproducible results for all subsequent function calls, and as to why we use 42 see <a target="_blank" href="https://en.wikipedia.org/wiki/Phrases_from_The_Hitchhiker%27s_Guide_to_the_Galaxy#The_Answer_to_the_Ultimate_Question_of_Life,_the_Universe,_and_Everything_is_42">here</a>.</p>
          <pre><code>
      # split the train and test data using 75% of the data for training, 42 is used as the random state
      train_features, test_features, train_labels, test_labels = train_test_split(x, y, test_size=0.25, random_state=42)
          </code></pre>
          <p>Now that the data has been split the random forest object can be instantiated. This implementation uses a random forest with 100 decision trees but with more trial and error this number could be fine tuned. Each decision tree will be built by using a subset of the "features" with replacement. This is what ensures that the results from one decision tree will be uncorrelated from the results of another (remember that we have 3000 "features" which represent the most frequent words that occur in our data set). Once the object is created it can be fit with the training data which completes our model.</p>
          <pre><code>
      # create a random forest with 30 decision trees
      rf = RandomForestClassifier(n_estimators=100, random_state=42, criterion='entropy')

      # train data
      rf.fit(train_features, train_labels)
          </code></pre>
          <p>Once the forest has been fit with the training data we can test it out. Using the testing data that was created with scikit-learn we can gather predictions for each text and compare it against the actual classifications that we know each text to be. For this model we had an accuracy of roughly 98%.</p>
          <pre><code>
      # test to see accuracy
      predictions = rf.predict(test_features)
      print(f'Accuracy of test: {accuracy_score(predictions, test_labels)}')
      >>> Accuracy of test: 0.9770279971284996
          </code></pre>
          <p>Now that we are confident that our model works we can test it out with legitimate SMS messages. Below are the results from predicting classifications for two texts, one obviously ham and the other more spam-like.</p>
          <pre><code>
      # text that is spam like being predicted as 96% chance of being spam
      spam_text = np.array(["FreeMsg: Txt: CALL to No: 86888 & claim your reward of 3 hours talk time to use from your phone now! ubscribe6GBP/ mnth inc 3hrs 16 stop?txtStop"])
      spam_data = cv.transform(spam_text).toarray()
      print(f'Probability of spam: {rf.predict_proba(spam_data)[0][1]}')
      >>> 0.96

      # text that is ham being predicted as 0% chance of being spam
      ham_text = np.array(["Hello mate, when can I expect you today?"])
      ham_data = cv.transform(ham_text).toarray()
      print(f'Probability of ham: {rf.predict_proba(ham_data)[0][1]}')
      >>> 0.0
          </code></pre>
          <p>These classifications look pretty good! The entirety of the project did not take a significant amount of code and proves to be quite powerful. Libraries like scikit-learn makes the implementation simple and allows application developers, like myself, leverage machine learning algorithms without needing to write the underlying algorithmic code.</p>
          <p>Source code for this example can be found <a target="_blank" href="https://github.com/MattBriden/Random-Forest-Example">here</a>.</p>
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
  name: 'MLBlog',
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
pre code {
  background-color: #eee;
  border: 1px solid #999;
  display: block;
  overflow: auto;
}
.card a {
  text-decoration: none;
  font-weight: bold;
  color: #75ab38;
}
@media screen and (max-width: 700px) {
  .card {
    padding: 10px;
  }
}
</style>