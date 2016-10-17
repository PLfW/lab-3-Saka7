class User {

  constructor(id, type, firstName="", secondName="",
    email="", password="", phone="", bio="No description", image="") {
    
    this.id = id;
    this.type = type;
    this.firstName = firstName;
    this.secondName = secondName;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.bio = bio;
    this.image = image;
  }

  toString() {
    return JSON.stringify(this);
  }

}

module.exports = User;