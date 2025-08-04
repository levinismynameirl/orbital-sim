import numpy as np

def calculate_orbit(mass, speed, distance, planet_mass):
    G = 6.67430e-11  # gravitational constant (m^3 kg^-1 s^-2)
    mu = G * planet_mass
    # Specific orbital energy
    energy = 0.5 * speed**2 - mu / distance
    # Orbital period (assuming circular orbit)
    if mu > 0 and distance > 0:
        period = 2 * np.pi * np.sqrt(distance**3 / mu)
    else:
        period = None
    return {
        'energy': energy,
        'period': period,
        'mu': mu
    }