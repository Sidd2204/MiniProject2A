from flask import Flask, url_for, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html", 
                           font_url1 = "https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;600;700&display=swap",
                           font_url2 = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css")


@app.route("/login")
def loginpage():
    return render_template("newlogin.html",
                           box_url='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css',
                           font_url = 'https://kit.fontawesome.com/81cbcd9b09.js')


if __name__ == "__main__":
    app.run(debug=True)