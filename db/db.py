from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from datetime import datetime

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    location = db.relationship('Location', 
        backref=db.backref('event', lazy='dynamic'))
    time = db.Column(db.Time)
    link = db.Column(db.String(100))
    description = db.Column(db.Text)
    category = db.Column(db.Integer)


    def __init__(self, name, location, time, link, description, category):
        self.name = name
        self.location = location
        self.time = time
        self.link = link
        self.description = description
        self.category = category

    def __repr__(self):
        return '<Event %r>' % self.name


class Location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    short_name = db.Column(db.String(50))
    lat = db.Column(db.Float)
    lon = db.Column(db.Float)
    addr = db.Column(db.String(100))

    def __init__(self, name, short_name, lat, lon, addr):
        self.name = name
        self.short_name = short_name
        self.lat = lat
        self.lon = lon
        self.addr = addr

    def __repr__(self):
        return '<Location %r>' % self.name