package com.example.test_module4.service.impl;

import com.example.test_module4.model.City;
import com.example.test_module4.service.ICityService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CityService implements ICityService {

    @Override
    public Iterable<City> findAll() {
        return null;
    }

    @Override
    public Optional<City> findById(Long id) {
        return Optional.empty();
    }

    @Override
    public void save(City city) {

    }

    @Override
    public void remove(Long id) {

    }
}
