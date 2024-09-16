class User:
    def __init__(self, user_id, nric, name, gender, age, postal_code, address, languages, profile_img, email, password):
        self.user_id = user_id
        self.nric = nric
        self.name = name
        self.gender = gender
        self.age = age
        self.postal_code = postal_code
        self.address = address
        self.languages = languages
        self.profile_img = profile_img
        self.email = email
        self.password = password

class Senior:
    def __init__(self, senior_id, name, gender, age, postal_code, address, languages, last_visited, visit_consent, errand_consent):
        self.senior_id = senior_id
        self.name = name
        self.gender = gender
        self.age = age
        self.postal_code = postal_code
        self.address = address
        self.languages = languages
        self.last_visited = last_visited
        self.visit_consent = visit_consent
        self.errand_consent = errand_consent
        
class Visit:
    def __init__(self, visit_id, senior_id, visitor_ids, datetime):
        self.visit_id = visit_id
        self.senior_id = senior_id
        self.visitor_ids = visitor_ids
        self.datetime = datetime