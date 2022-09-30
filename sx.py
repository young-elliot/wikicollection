
from flask import Flask

from mitmproxy.options import Options
from mitmproxy.tools.dump import DumpMaster
import requests

import threading
import asyncio

class RequestLogger:
    def request(self, flow):
        # if "/en/app/Search/PaintingAdvancedSearch/" in flow.request:
        # print(help(flow))
        print("cookies",flow.request.cookies)
        print("url",flow.request.url)
    # def response(self,flow):
    #     print(flow.response)

async def start_proxy():
    opts = Options(listen_host="127.0.0.1", listen_port=8090)

    master = DumpMaster(
        opts,
        with_termlog=False,
        with_dumper=False,
    )
    master.addons.add(RequestLogger())
    
    await master.run()
    return master

if __name__ == '__main__':
    asyncio.run(start_proxy())
    
    
    


# proxies = {
#     'http': 'http://127.0.0.1:8080',
#     'https': 'http://127.0.0.1:8080',
# }

# # Change replay_url -> http://dummy.com/get_details.html
# replay_url = 'http://wttr.in/Innsbruck?0'

# class Repeat:
#     def __init__(self):
#         self.replay_response = None

#     def request(self, flow):
#         if 'repeat_again' in flow.request.pretty_url:
#             flow.response = self.replay_response

#     def response(self, flow):
#         if replay_url in flow.request.pretty_url:
#             self.replay_response = flow.response


# app = Flask("proxapp")
# repeat = Repeat()


# @app.route('/get_again')
# def get_again():
#     resp = requests.get('http://repeat_again', proxies=proxies)
#     return (resp.text, resp.status_code, resp.headers.items())


# def loop_in_thread(loop, m):
#     asyncio.set_event_loop(loop)
#     m.run_loop(loop.run_forever)


# if __name__ == "__main__":
#     options = Options(listen_host='0.0.0.0', listen_port=8080, http2=True)
#     m = DumpMaster(options, with_termlog=True, with_dumper=True)
#     m.addons.add(repeat)
#     # config = ProxyConfig(options)
#     # m.server = ProxyServer(config)
    

#     # run mitmproxy in background, especially integrated with other server
#     loop = asyncio.get_event_loop()
#     t = threading.Thread(target=loop_in_thread, args=(loop, m))
#     t.start()
#     app.run(debug=True, use_reloader=False, host='0.0.0.0', port=int('28888'))