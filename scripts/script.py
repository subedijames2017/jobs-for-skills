import sys
import json
import pickle
from pathlib import Path
import os
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from operator import itemgetter
import pandas as pd
skillSet = json.loads(sys.argv[1])
filePath = os.getcwd() + '/scripts/multinominalnb.sav'
csvPath = os.getcwd() + '/scripts/preprocessed.csv'

loaded_model = pickle.load(open( filePath, 'rb'))

# Examples of skills e1 and e2
# e1 = "Strong command of SQL and SQL server tools,Advanced knowledge of database security, backup and recovery, and performance monitoring standards,Understanding of relational and dimensional data modeling,PowerShell and Unix shell scripting skills,Familiarity with SSAS, SSIS, SSRS,Strong mathematical and statistical knowledge,Excellent written and verbal communication skills,Impeccable attention to detail"

doc = [skillSet['skills']]
doc = " ".join(doc).lower()

predicted = loaded_model.predict([doc])
response={
  "data": list(predicted.flatten())
}
#load dataframes
df = pd.read_csv(csvPath)
label = list(df['Job Title'].values)
documents = list(df['Job Description'].values)

#skills add
documents.append(doc)
label.append("pred")


# Create the Document Term Matrix
count_vectorizer = CountVectorizer(stop_words='english')
sparse_matrix = count_vectorizer.fit_transform(documents)

doc_term_matrix = sparse_matrix.todense()
df = pd.DataFrame(doc_term_matrix, 
                  columns=count_vectorizer.get_feature_names())

sim = cosine_similarity(df,df)

intrst_skills_sim = sim[-1]

def merge(list1, list2):
    merged_list = tuple(zip(list1, list2)) 
    return merged_list

label_and_pr = merge(label, intrst_skills_sim.tolist())
rank_output = sorted(label_and_pr,key=itemgetter(1), reverse=True)

names = list(zip(*rank_output))[0]


unique_names = list(dict.fromkeys(names))

suggstions = unique_names[1:4]
response['data']  = response['data'] + suggstions


print(json.dumps(response))

sys.stdout.flush()