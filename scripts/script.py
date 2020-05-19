import sys
import json
y = json.loads(sys.argv[1])

response={
  "status":200,
  "message":"data from python script",
  "data": y["name"]
}
print(json.dumps(response))

sys.stdout.flush()