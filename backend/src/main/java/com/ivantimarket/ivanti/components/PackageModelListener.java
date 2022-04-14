package com.ivantimarket.ivanti.components;

import com.ivantimarket.ivanti.model.Package;
import com.ivantimarket.ivanti.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@Component
public class PackageModelListener extends AbstractMongoEventListener<Package> {

    private SequenceGeneratorService sequenceGeneratorService;

    @Autowired
    public PackageModelListener(SequenceGeneratorService sequenceGeneratorService) {
        this.sequenceGeneratorService = sequenceGeneratorService;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Package> event) {
        if (event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGeneratorService.generateSequence(Package.SEQUENCE_NAMEE));
        }
    }

}
