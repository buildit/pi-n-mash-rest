from sense_hat import SenseHat
import web
import json
import io
import time
import picamera

sense = SenseHat()
sense.low_light = True

urls = (
	'/', 'index',
    '/api/auth/fingerprint', 'fingerprint',
    '/api/auth/motion', 'motion',
    '/api/auth/voice', 'voice',
    '/api/auth/face', 'face',
)

class index:
    def GET(self):
        return "Raspeberry Pi Auth"

class fingerprint:
	def POST(self):
		data = json.loads(web.data())
		print data
		
if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
