from flask import Flask, url_for, render_template, jsonify, request
from env.passwords import sqlpassword
import mysql.connector



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





@app.route('/homepage')
def homepage():
    return render_template('homepage.html')





@app.route("/login/handleLogin", methods=['POST',])
def handleLogin():
    data = request.get_json()
    username = data['username']
    password = data['password']

    try:
        conn = mysql.connector.connect(host='localhost',
                                       username='root',
                                       password=sqlpassword,
                                       database='mp2a')
        
        cursor = conn.cursor()

        cursor.execute("select * from login where username = %s and password = %s", (username, password))
        
        result = cursor.fetchone()
        if result:
            return ({'status': 'ok'})
        else:
            return ({'status': 'error'})
        

    except Exception as e:
        print("\n\n", e, "\n\n")

    finally:
        cursor.close()
        conn.close()





@app.route('/login/handleRegister', methods=['POST'])
def handleRegister():
    payload = request.get_json()
    try:
        conn = mysql.connector.connect(host = 'localhost',
                                       username = 'root',
                                       password = sqlpassword,
                                       database = 'mp2a')
    
        cursor = conn.cursor()

        cursor.execute("insert into login values( %s, %s );", (payload['username'], payload['password']))
        cursor.execute("insert into profile values( %s, %s, %s, NOW() );", (payload['username'], payload['fname'], payload['lname']))
        conn.commit()

        return jsonify({})
    
    except mysql.connector.errors.IntegrityError as e:
        print("\n\n{} Error type: {}\n\n".format(e, type(e)))
        return jsonify({'integrityError': 'ERROR => '+ str(e)})

    except Exception as e:
        print("\n\n{} Error type: {}\n\n".format(e, type(e)))
        return jsonify({'otherError': 'ERROR => '+ str(e)})


    finally:
        cursor.close()
        conn.close()



if __name__ == "__main__":
    app.run(debug=True)