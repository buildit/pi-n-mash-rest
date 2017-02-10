import web
import json

urls = (
	'/', 'index',
    '/api/auth/fingerprint/(\d+)', 'fingerprint'
)

class index:
    def GET(self):
        return "Raspeberry Pi Auth"

class fingerprint:
	def POST(self, id):
        print id

if __name__ == "__main__":
    app = web.application(urls, globals())
    app.run()
