import sass
import os
import time

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer
import watchdog

class OnModified(FileSystemEventHandler):
    def __init__(self, callback, cb_args={}, *args, **kwargs):
        self.callback = callback
        self.cb_args = cb_args
        super(OnModified, self).__init__(*args, **kwargs)

    def on_created(self, event):
        print("Detected change, recompiling")
        self.callback(**self.cb_args)

    def on_modified(self, event):
        print("Detected change, recompiling")
        self.callback(**self.cb_args)
        

if __name__ == "__main__":
    sass_args = dict(
        dirname=("sass", "css"),
        output_style='compressed'
    )
    sass.compile(**sass_args)

    # Keep watching for changes
    event_handler = OnModified(callback=sass.compile, cb_args=sass_args)
    observer = Observer()
    observer.schedule(event_handler, "sass", recursive=True)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()