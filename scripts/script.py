import sys
import json
import pickle
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.feature_extraction.text import CountVectorizer

# load trained model
# clfs = pickle.load(open("MultinominalNB.pkl", 'rb' ))
# count_vect = CountVectorizer(vocabulary=clfs)
# tfidf_transformer = TfidfTransformer(use_idf=False)
# clfs = # load the model from disk
loaded_model = pickle.load(open('multinominalnb.sav', 'rb'))

# Examples of skills e1 and e2
e1 = """Advanced degree in computer science, math, statistics or a related discipline
Extensive data modeling and data architecture skills
Programming experience in Python
Experience in machine learning frameworks in python such as TensorFlow or Keras
Strong knowledge about machine learning and deep learning algorithms such as k-Nearest, LSTM or CNN
Strong written and verbal communications in English."""

e2 = """Problem solving skills with an emphasis on product development.
Focus on quality and ensuring the responsiveness of applications.
Expertise in back-end programming languages (node.js, PHP and Python).
Expertise in front-end technologies; JavaScript, React/Redux, and JQuery), HTML, CSS, etc.
Proficient and demonstrable experience with databases such as MySQL, MongoDB, etc.
A professional and personal need for code integrity and organization. Experience working with graphic
designers and converting designs to visual elements. Understanding and implementation of security and
data protection strategies. Understanding of code versioning tools such as Git.
Understanding and strong interest in DevOps. Experience in designing and developing APIs.
A desire to stay abreast of developments in web applications and programming languages.
Excellent written and verbal communication skills for coordinating across teams.
A drive to learn and master new technologies and techniques."""

# # take skill in list
# docs_new = [e1,e2]
# # preprocess data
# X_new_counts = count_vect.transform(docs_new)
# X_new_tfidf = tfidf_transformer.transform(X_new_counts)
# # predict the class
# print("pass")
predicted = clfs.predict([e1])
output = list(predicted)

# predicted = ['Machine Learning', 'Full Stack Developer']
# y = json.loads(sys.argv[1])

print(output)

response={
  "status":200,
  "message":"The recommended Job title is",
  "data": predicted #y["name"]
}
print(json.dumps(response))

sys.stdout.flush()
