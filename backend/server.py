from app import app, socket_io

if __name__ == "__main__":
    socket_io.run(app, debug=True,allow_unsafe_werkzeug=True)