import sys
import json
import pickle
from pathlib import Path
# y = json.loads(sys.argv[1])

loaded_model = pickle.load(open( "/home/james/final-year-project/scripts/multinominalnb.sav", 'rb'))

# Examples of skills e1 and e2
e1 = "Strong command of SQL and SQL server tools,Advanced knowledge of database security, backup and recovery, and performance monitoring standards,Understanding of relational and dimensional data modeling,PowerShell and Unix shell scripting skills,Familiarity with SSAS, SSIS, SSRS,Strong mathematical and statistical knowledge,Excellent written and verbal communication skills,Impeccable attention to detail"

doc = [e1]
predicted = loaded_model.predict(doc)
response={
  "data": list(predicted.flatten())
}
print(json.dumps(response))

sys.stdout.flush()