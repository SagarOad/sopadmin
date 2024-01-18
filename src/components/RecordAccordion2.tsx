import Data from '../EducationCardData'
import ExamAccordion from './ExamAccordion'

const RecordAccordion2 = () => {
  return (
    <div>
        {Data.map((item) => (
          <ExamAccordion key={item.id} header={item.header} date={item.date} />
        ))}
    </div>
  )
}

export default RecordAccordion2