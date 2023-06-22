'use client';

import { useMemo, useState } from "react";
import dynamic from 'next/dynamic'
import { FieldValues, SubmitHandler, useForm} from 'react-hook-form';

import Modal from './Modal'
import useRentModal from '@/app/hooks/useRentModal';
import Heading from "@/app/components/Heading";
import { categoriesList } from "@/app/data/categoriesList";
import Category from "@/app/components/Category";
import CountrySelect from "@/app/components/inputs/CountrySelect";

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5,
}

const RentModal = () => {

  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY);
  
  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors,
    },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
        category: '',
        location: null,
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        imageSrc: '',
        price: 1,
        title: '',
        description: '',
        }
    });

  const location = watch('location');
  const category = watch('category');

  const Map = useMemo(() => dynamic(() => import('../Map'), { 
    ssr: false 
  }), [location]);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true
    })
  }

  const onBack = () => {
    setStep(prev => prev - 1)
  }

  const onNext = () => {
    setStep(prev => prev + 1)
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
        return 'Create'
    }
  
    return 'Next'
  } , [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined
    }

    return 'Back'
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto"
      >
        {
            categoriesList.map(item => (
                <Category
                    onClick={(category) => 
                        setCustomValue('category', category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                    key={item.label}
                />
            ))
        }
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect
            value={location}
            onChange={(value) => setCustomValue('location', value)} 
        />
        <Map 
            center={location?.latlng}
        />
      </div>
        );
    }
  
  return (
    <Modal
        isOpen={rentModal.isOpen}
        onClose={() => {
            rentModal.onClose()
            reset()
        }}
        onSubmit={onNext}
        title="Places your home"
        actionLabel={actionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        secondaryActionLabel={secondaryActionLabel}
        body={bodyContent}
    />
  )
}

export default RentModal