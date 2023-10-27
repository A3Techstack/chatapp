<template>
  <div class="about">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h1>About Us</h1>
          <p>Welcome to our Chat App, your go-to platform for seamless communication. Our mission is to provide a user-friendly and secure chat experience for individuals and teams.</p>
          <p>At Chat App, we believe that effective communication is the key to success. Whether you're connecting with friends, colleagues, or clients, our app is designed to meet your needs.</p>
        </div>
        <div class="col-md-6">
          <!-- <img src="./chat.png" alt="Team Photo" class="img-fluid rounded-circle" /> -->
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2>Our Team</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="team-member">
            <!-- <img src="team-member-1.jpg" alt="Team Member 1" class="img-fluid rounded-circle" /> -->
            <h3>John Doe</h3>
            <p>Co-Founder</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="team-member">
            <!-- <img src="team-member-2.jpg" alt="Team Member 2" class="img-fluid rounded-circle" /> -->
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="team-member">
            <!-- <img src="team-member-3.jpg" alt="Team Member 3" class="img-fluid rounded-circle" /> -->
            <h3>Alice Johnson</h3>
            <p>Designer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 40px 0;
  text-align: center;
}

.team-member {
  margin-top: 20px;
}

.team-member img {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border: 3px solid #1da1f2;
  border-radius: 50%;
}

.team-member h3 {
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
}

.team-member p {
  color: #888;
}
</style>
